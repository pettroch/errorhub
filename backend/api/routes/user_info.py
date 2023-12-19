from api import *
from database.database import Db


user_info_blueprint = Blueprint("user_info", __name__)


@user_info_blueprint.route("/api/user_info", methods=["GET"])
def user_info():
    """
    Получить инфу о юзере

    Параметры:
        {
            uid: int - айди юзера
        }

    Возвращаемое значение:
        {
            uid: int - айди юзера
            name: string - имя юзера
            role_id: int - айди роли
        }
    """

    try:
        uid = int(request.json["uid"])

        db = Db()
        info = db.get_user_info(uid)
        
        return jsonify(info)
    
    except KeyError as e:
        return jsonify({"error": f"key {e} not found"})