from abc import ABC, abstractmethod
from typing import Any, Dict

class WorkflowPlugin(ABC):
    @abstractmethod
    def run(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        pass
