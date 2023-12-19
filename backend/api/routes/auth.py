from api import *
from database.database import Db


auth_blueprint = Blueprint("auth", __name__)


users = [
    {
        "login": "user",
        "password": "user",
        "role_id": 0,
        "uid": 0
    },

    {
        "login": "admin",
        "password": "admin",
        "role_id": 1,
        "uid": 1
    }
]


@auth_blueprint.route("/api/auth", methods=["POST"])
def auth():
    """
    Авторизация

    Параметры:
        {
            login: string - логин юзера
            password: string - пароль юзера
        }

    Возвращаемое значение:
        {
            result: bool - успех
        }
    """

    db = Db()

    try:
        login = request.json["login"]
        password = request.json["password"]
    except KeyError as e:
        return jsonify({"error": f"key {e} not found"})
    
    for user in db.get_all_users():
        if user["login"] == login and user["password"] == password:
            role = db.get_role(user['role_id'])
            user['role'] = role

            return jsonify({"result": True, "user": user})
        
    return jsonify({"result": False, "error": "invalid credentials"})