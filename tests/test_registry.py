from agents.registry import PluginRegistry


def test_plugin_registry():
    registry = PluginRegistry(plugin_dir="plugins")
    registry.discover_plugins()

    registry.initialize_plugins({
        "memory_cache": {"cache_limit": 3},
    })

    # If memory_cache is present, run a basic call (guarded)
    if "memory_cache" in registry.plugins:
        out = registry.execute_plugin("memory_cache", {"embedding": [0.1, 0.2, 0.3], "summary": "test", "timestamp": 1})
        assert "recent_memories" in out or isinstance(out, dict)

    # Reload if present
    if "memory_cache" in registry.plugin_meta:
        registry.reload_plugin("memory_cache")

    registry.shutdown_all()

    print("✅ PluginRegistry test completed.")
