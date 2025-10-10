import time
import numpy as np
from plugins.memory_cache import MemoryCachePlugin


def test_memory_cache(tmp_path):
    plugin = MemoryCachePlugin()
    mem_dir = str(tmp_path / "mem")
    plugin.initialize({"memory_dir": mem_dir, "cache_limit": 5})

    for i in range(3):
        embedding = np.random.rand(8)
        result = plugin.process({
            "embedding": embedding.tolist(),
            "summary": f"Episode {i}: tested memory cache",
            "timestamp": time.time()
        })
        assert "recent_memories" in result

    plugin.shutdown()
    print("✅ MemoryCachePlugin test passed.")
