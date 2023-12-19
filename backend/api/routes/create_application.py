import datetime

from api import *
from database.database import Db


create_application_blueprint = Blueprint("create_application", __name__)


@create_application_blueprint.route("/api/create_application", methods=["POST"])
def create_application():
    """
    Создать заявку

    Параметры:
        {
            name: string - название заявки
            maker_id: int - айди создателя заявки
            taker_id: int - айди исполнителя по заявке (оператора)
            description: string - описание заявки
        }

    Возвращаемое значение:
        {
            aid: int - айди заявки
        }
    """

    try:
        name = request.json["name"]
        maker_id = request.json["maker_id"]
        taker_id = request.json["taker_id"]
        description = request.json["description"]

        db = Db()
        status_id = db.get_status_id("Принята")["id"]
        db.add_application(status_id, datetime.datetime.now().strftime('%Y-%m-%d'), name, maker_id, taker_id, description)
        last_id = db.get_last_application_id()["id"]

        return jsonify({"aid": last_id})
    
    except KeyError as e:
        return jsonify({"error": f"key {e} not found"})
    