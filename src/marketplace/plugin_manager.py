import importlib, os, sys
from src.marketplace.plugin_base import WorkflowPlugin

PLUGIN_DIR = os.path.join(os.path.dirname(__file__), "plugins")

def discover_plugins():
    sys.path.append(PLUGIN_DIR)
    plugins = []
    for f in os.listdir(PLUGIN_DIR):
        if f.startswith("plugin_") and f.endswith(".py"):
            mod = importlib.import_module(f.replace(".py", ""))
            for attr in dir(mod):
                obj = getattr(mod, attr)
                if isinstance(obj, type) and issubclass(obj, WorkflowPlugin) and obj is not WorkflowPlugin:
                    plugins.append(obj())
    return plugins

def run_plugin(plugin_name, input_data):
    for plugin in discover_plugins():
        if plugin.__class__.__name__.lower() == plugin_name.lower():
            return plugin.run(input_data)
    return {"success": False, "msg": "Plugin not found"}
