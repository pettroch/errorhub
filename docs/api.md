### Получить инфу о юзере

**Параметры**
* uid - айди юзера

```
GET /api/user_info/
{
    uid: int,
    name: string,
    role_id: id,
}
```
**Возвращаемое значение**
* uid - айди юзера
* name - имя юзера
* role_id - айди роли

#

### Получить все заявки юзера

**Параметры**

* uid - айди юзера

```
GET /api/all_application_user/
{
    application_list: [
        {
            aid: int,
            status_id: int,
            date: string,
            name: string,
            maker_id: int,
            taker_id: int,
            description: string
        }
    ]
}

```
**Возвращаемое значение**
* application_list - список заявок:
    * aid - айди заявки
    * status_id - айди статуса заявки
    * date - дата создания заявки
    * name - название заявки
    * maker_id - айди создателя заявки
    * taker_id - айди исполнителя по заявке (оператора)
    * description - описание заявки

#


### Получить инфу о заявке

**Параметры**

* aid - айди заявки

```
GET /api/application/
{
    aid: int,
    status_id: int,
    date: string,
    name: string,
    maker_id: int,
    taker_id: int,
    description: string
}
```
**Возвращаемое значение**
* aid - айди заявки
* status_id - айди статуса заявки
* date - дата создания заявки
* name - название заявки
* maker_id - айди создателя заявки
* taker_id - айди исполнителя по заявке (оператора)
* description - описание заявки

#

### Получить конкретную заявку юзера

**Параметры**

* uid - айди юзера
* aid - айди заявки

```
GET /api/application_user/
{
    aid: int,
    status_id: int,
    date: string,
    name: string,
    maker_id: int,
    taker_id: int,
    description: string
}
```
**Возвращаемое значение**
* aid - айди заявки
* status_id - айди статуса заявки
* date - дата создания заявки
* name - название заявки
* maker_id - айди создателя заявки
* taker_id - айди исполнителя по заявке (оператора)
* description - описание заявки

#

### Создать заявку

**Параметры**

* name - название заявки
* maker_id - айди создателя заявки
* taker_id - айди исполнителя заявки
* description - описание заявки

```
POST /api/create_application
{
    name: string,
    maker_id: int,
    taker_id: int,
    description: string
}
```
**Возвращаемое значение**

* aid - айди заявки

#

### Изменить статус заявки

**Параметры**

* aid - айди заявки
* status_id - айди статуса

```
PUT /api/change_status/
{
    aid: int,
    status_id: int
}
```
**Возвращаемое значение**

* result: bool

#

### Получить статус заявки

**Параметры**

* aid - айди заявки
```
GET /api/application_status/
{
    aid: int,
    status_id: int
}
```
**Возвращаемое значение**
* aid - айди заявки
* status_id - айди статуса

#

### Авторизация юзера

**Параметры**

* login - логин юзера
* password - пароль юзера

```
POST /api/auth
{
    role_id: int,
    result: bool
}
```
**Возвращаемое значение**
* role_id - айди роли юзера
* result - успех авторизации