from plugins.error_recovery import ErrorRecoveryPlugin


def test_error_recovery():
    plugin = ErrorRecoveryPlugin()
    plugin.initialize({})

    try:
        1 / 0
    except Exception as e:
        result = plugin.process({
            "error": e,
            "context": "Division by zero in calculation loop"
        })
        assert "recovery_action" in result

    plugin.shutdown()
    print("✅ ErrorRecoveryPlugin test passed.")
