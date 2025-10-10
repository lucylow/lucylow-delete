import base64
import io
from PIL import Image
from plugins.vision_boost_plugin import VisionBoostPlugin


def _mock_image_b64() -> str:
    """Creates a mock white image for testing."""
    img = Image.new("RGB", (128, 128), color="white")
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return base64.b64encode(buf.getvalue()).decode("utf-8")


def test_vision_boost():
    plugin = VisionBoostPlugin()
    plugin.initialize({})

    mock_data = {
        "frame_base64": _mock_image_b64(),
        "timestamp": 123456.789,
        "context": "test",
    }

    result = plugin.process(mock_data)

    assert "caption" in result
    assert "detected_objects" in result
    assert isinstance(result["visual_embedding"], list)

    plugin.shutdown()
    print("✅ VisionBoostPlugin test passed.")
