from api import *
from database.database import Db


application_status_blueprint = Blueprint("application_status", __name__)


@application_status_blueprint.route("/api/application_status", methods=["GET"])
def application_status():
    """
    Получить статус заявки

    Параметры:
        {aid: int - айди заявки}

    Возвращаемое значение:
        {
            aid: int - айди заявки
            status_id:int  - айди статуса заявки
        }
    """

    try:
        aid = int(request.json["aid"])

        db = Db()
        status = db.get_application_info(aid)["status_id"]

        return jsonify({"status_id": status})
    except KeyError as e:
        return jsonify({"error": f"key {e} not found"})