"""Sophisticated reward shaping for RL agent training"""
from typing import Dict, Any, List, Optional
import numpy as np
import logging

logger = logging.getLogger(__name__)

class AdvancedRewardShaper:
    """Sophisticated reward shaping for RL agent training"""
    
    def __init__(self, config: Dict[str, Any]):
        self.config = config
        self.reward_components = {}
        self.state_action_counts: Dict[str, int] = {}
        
    def calculate_comprehensive_reward(self, 
                                    episode_data: Dict[str, Any],
                                    current_state: Dict[str, Any],
                                    action: Dict[str, Any],
                                    next_state: Dict[str, Any]) -> float:
        """Calculate multi-faceted reward for RL training"""
        
        rewards = {
            'task_success': self._calculate_task_success_reward(episode_data),
            'efficiency': self._calculate_efficiency_reward(episode_data),
            'goal_progress': self._calculate_goal_progress_reward(current_state, next_state),
            'exploration': self._calculate_exploration_bonus(current_state, action),
            'safety': self._calculate_safety_penalty(action, next_state),
            'user_satisfaction': self._calculate_user_satisfaction_reward(episode_data)
        }
        
        # Weighted combination of reward components
        weights = self.config.get('reward_weights', {
            'task_success': 2.0,
            'efficiency': 0.5,
            'goal_progress': 0.3,
            'exploration': 0.1,
            'safety': -1.0,
            'user_satisfaction': 0.8
        })
        
        total_reward = sum(rewards[component] * weights.get(component, 0.0) 
                         for component in rewards)
        
        # Store for analysis
        self.reward_components = rewards
        
        logger.debug(f"Reward breakdown: {rewards}, Total: {total_reward:.3f}")
        
        return total_reward
    
    def _calculate_task_success_reward(self, episode_data: Dict[str, Any]) -> float:
        """Reward for successful task completion"""
        if episode_data.get('success', False):
            return 1.0
        return -0.3
    
    def _calculate_efficiency_reward(self, episode_data: Dict[str, Any]) -> float:
        """Reward for efficient task execution (fewer steps)"""
        max_steps = self.config.get('max_steps', 50)
        steps_taken = len(episode_data.get('steps', []))
        
        if steps_taken == 0:
            return 0.0
        
        # Normalize to 0-1 range, fewer steps = higher reward
        efficiency = 1.0 - (steps_taken / max_steps)
        return max(0, efficiency)
    
    def _calculate_goal_progress_reward(self, current_state: Dict[str, Any], 
                                      next_state: Dict[str, Any]) -> float:
        """Reward for making progress toward goal"""
        current_goal_indicators = self._extract_goal_indicators(current_state)
        next_goal_indicators = self._extract_goal_indicators(next_state)
        
        progress = len(next_goal_indicators) - len(current_goal_indicators)
        return progress * 0.1
    
    def _calculate_exploration_bonus(self, state: Dict[str, Any], 
                                   action: Dict[str, Any]) -> float:
        """Bonus for exploring new states or actions"""
        state_action_key = f"{hash(str(state))}_{hash(str(action))}"
        
        # Simple count-based exploration bonus
        count = self.state_action_counts.get(state_action_key, 0)
        self.state_action_counts[state_action_key] = count + 1
        
        return 1.0 / np.sqrt(count + 1)
    
    def _calculate_safety_penalty(self, action: Dict[str, Any], 
                                 next_state: Dict[str, Any]) -> float:
        """Penalty for potentially unsafe actions"""
        penalty = 0.0
        
        # Check for destructive action patterns
        destructive_keywords = ['delete', 'remove', 'uninstall', 'format', 'erase']
        action_str = str(action).lower()
        
        if any(keyword in action_str for keyword in destructive_keywords):
            penalty -= 0.5
        
        # Check for error states
        if next_state.get('error', False) or next_state.get('crashed', False):
            penalty -= 1.0
        
        return penalty
    
    def _calculate_user_satisfaction_reward(self, episode_data: Dict[str, Any]) -> float:
        """Reward based on user satisfaction indicators"""
        satisfaction = 0.0
        
        # Time-based satisfaction (faster is better)
        duration = episode_data.get('duration', 0)
        max_acceptable_duration = self.config.get('max_acceptable_duration', 300)
        
        if duration > 0:
            time_satisfaction = 1.0 - min(duration / max_acceptable_duration, 1.0)
            satisfaction += time_satisfaction * 0.5
        
        # Success without errors
        if episode_data.get('success') and episode_data.get('error_count', 0) == 0:
            satisfaction += 0.5
        
        return satisfaction
    
    def _extract_goal_indicators(self, state: Dict[str, Any]) -> List[str]:
        """Extract indicators of goal achievement from state"""
        indicators = []
        for element in state.get('text_elements', []):
            text = element.get('text', '').lower()
            if any(keyword in text for keyword in ['success', 'complete', 'done', 'finished']):
                indicators.append(text)
        return indicators
    
    def get_reward_breakdown(self) -> Dict[str, float]:
        """Get detailed breakdown of last reward calculation"""
        return self.reward_components.copy()
