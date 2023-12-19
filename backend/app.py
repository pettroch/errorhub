from flask import Flask
from flask_cors import CORS

from api.routes.user_info import user_info_blueprint
from api.routes.all_application_user import all_application_user_blueprint
from api.routes.all_application_admin import all_application_admin_blueprint
from api.routes.application_user import application_user_blueprint
from api.routes.create_application import create_application_blueprint
from api.routes.change_status import change_status_blueprint
from api.routes.application import application_blueprint
from api.routes.application_status import application_status_blueprint
from api.routes.auth import auth_blueprint
from api.routes.send_message import send_message_blueprint


app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config["SECRET_KEY"] = "2a13s4d5f6g7h8uja2s43d5f6gy7hu8j9i9k8j7uh6yg5tf4r3d"


if __name__ == "__main__":
    app.register_blueprint(user_info_blueprint, url_prefix='/')
    app.register_blueprint(all_application_user_blueprint, url_prefix='/')
    app.register_blueprint(all_application_admin_blueprint, url_prefix='/')
    app.register_blueprint(application_user_blueprint, url_prefix='/')
    app.register_blueprint(create_application_blueprint, url_prefix='/')
    app.register_blueprint(change_status_blueprint, url_prefix='/')
    app.register_blueprint(application_blueprint, url_prefix='/')
    app.register_blueprint(application_status_blueprint, url_prefix='/')
    app.register_blueprint(auth_blueprint, url_prefix='/')
    app.register_blueprint(send_message_blueprint, url_prefix='/')
    
    app.run(host='0.0.0.0', port=5000)

    