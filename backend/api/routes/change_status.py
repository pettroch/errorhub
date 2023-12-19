from api import *
from database.database import Db


change_status_blueprint = Blueprint("change_status", __name__)


@change_status_blueprint.route("/api/change_status", methods=["PUT"])
def change_status():
    """
    Изменить статус завки

    Параметры:
        {aid: int - айди заявки}

    Возвращаемое значение:
        {
            result: bool - успех
        }
    """

    try:
        aid = int(request.json["aid"])
        status_id = int(request.json["status_id"])

        db = Db()
        db.update_status_id(aid, status_id)

        return jsonify({"result": True})
    
    except KeyError as e:
        return jsonify({"error": f"key {e} not found"})