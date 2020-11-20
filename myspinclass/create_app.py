from flask import Flask
from flask_cors import CORS
from myspinclass import config
def create_app():
    app = Flask(__name__)

    if not config.STUB:
        from myspinclass.app import bluetooth_endpoints
        app.register_blueprint(bluetooth_endpoints.ble_bp)
    else:
        from myspinclass.app import test_blueprint
        app.register_blueprint(test_blueprint.bp)
    # Init the db. I'd like to have SQLAlchemy

    # We should use alembic for SQLAlchemy.

    CORS(app)

    return app



