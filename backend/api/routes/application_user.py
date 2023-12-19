from api import *
from database.database import Db


application_user_blueprint = Blueprint("application_user", __name__)


@application_user_blueprint.route("/api/application_user", methods=["GET"])
def application_user():
    """
    Получить конкретную заявку юзера

    Параметры:
        {
            uid: int - айди юзера
            aid: int - айди заявки
        }

    Возвращаемое значение:
        {
            aid: int - айди заявки
            status_id: int  - айди статуса заявки
            date: string - дата создания заявки
            name: - название заявки
            maker_id: - айди создателя заявки
            taker_id: - айди исполнителя по заявке (оператора)
            description: - описание заявки
        }
    """

    try:
        uid = int(request.json["uid"])
        aid = int(request.json["aid"])

        db = Db()
        info = db.get_application_info_user(uid, aid)

        return jsonify(info)
    except KeyError as e:
        return jsonify({"error": f"key {e} not found"})
    