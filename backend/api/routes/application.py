from api import *
from database.database import Db


application_blueprint = Blueprint("application", __name__)


@application_blueprint.route("/api/application", methods=["GET"])
def application():
    """
    Получить инфу о заявке

    Параметры:
        {aid: int - айди заявки}

    Возвращаемое значение:
        {
            aid: int - айди заявки
            status_id: int  - айди статуса заявки
            date: string - дата создания заявки
            name: - название заявки
            maker_id: - айди создателя заявки
            taker_id: - айди исполнителя по заявке (оператора)
            description: - описание заявки
            maker: - создатель
            taker: - тот, кто обрабатывает
            status: - статус
        }
    """

    try:
        aid = int(request.args.get("aid"))

        db = Db()
        application = db.get_application_info(aid)
        maker = db.get_user_info(application["maker_id"])
        taker = db.get_user_info(application["taker_id"])
        status = db.get_status(application["status_id"])
        messages = db.get_messages_by_application(application["id"])
        
        application["maker"] = maker
        application["taker"] = taker
        application["status"] = status
        application["messages"] = messages

        return jsonify(application)
    except KeyError as e:
        return jsonify({"error": f"key {e} not found"})