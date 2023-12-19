from api import *
from database.database import Db


all_application_admin_blueprint = Blueprint("all_application_admin", __name__)


@all_application_admin_blueprint.route("/api/all_application_admin", methods=["GET"])
def all_application_admin():
    """
    Получить все заявки юзера

    Параметры:
        {uid: int - айди юзера}

    Возвращаемое значение:
        (список заявок)
        application_list [
            {
                aid: int - айди заявки
                status_id: int  - айди статуса заявки
                date: string - дата создания заявки
                name: - название заявки
                maker_id: - айди создателя заявки
                taker_id: - айди исполнителя по заявке (оператора)
                description: - описание заявки
            }
        ]
    """

    try:
        uid = int(request.args.get("uid"))

        db = Db()
        info = db.get_all_application_admin(uid)
        
        for application in info:
            maker = db.get_user_info(application["maker_id"])
            taker = db.get_user_info(application["taker_id"])
            status = db.get_status(application["status_id"])
            
            application["maker"] = maker
            application["taker"] = taker
            application["status"] = status

        return jsonify(info)
    except KeyError as e:
        return jsonify({"error": f"key {e} not found"})