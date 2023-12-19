import { baseUrl } from "../../vars";

// Utils
function createOptions(type: 'POST' | 'GET' | 'PUT', body?: Record<string, unknown>) {
  if (type === 'GET') {
    const requestOptions: RequestInit = {
      method: type,
      headers: { 'Content-Type': 'application/json' },
    };
    return requestOptions;
  } else {
    const requestOptions: RequestInit = {
      method: type,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };
    return requestOptions;
  }

}

function getRequestRow(params: Record<string, unknown>) {
  const options: string[] = []
  for (const option in params) {
    options.push(`${option}=${params[option]}`)
  }
  return options.join('&')
}
// ===

// Auth
async function fetchAuth(login: string, password: string) {
  const body = {
    login: login,
    password: password
  }

  const responseRaw = await fetch(`${baseUrl}/api/auth`, createOptions('POST', body))
  const response = await responseRaw.json() as {
    result?: boolean,
    user?: { id: number, login: string, name: string, password: string, role: { id: number, name: string } },
    error?: string
  }

  return response;
}

// Application
export type ApplicationRaw = {
  id: number
  status_id: number
  date: string
  name: string
  maker_id: number
  taker_id: number
  description: string
  maker: {
    id: number
    login: string
    name: string
    role_id: number
  },
  taker: {
    id: number
    login: string
    name: string
    role_id: number
  },
  status: {
    id: number
    name: string
  },
  messages: MessageRaw[]
}

export type MessageRaw = {
  id: number;
  application_id: number;
  sender_id: number;
  text: string;
}

async function fetchCreateApplication(name: string, description: string, userId: number, takerId: number) {
  const body = {
    name: name,
    description: description,
    maker_id: userId,
    taker_id: takerId
  }

  const responseRaw = await fetch(`${baseUrl}/api/create_application`, createOptions('POST', body))
  const response = await responseRaw.json() as {
    aid: number
  }

  return response;
}

async function fetchGetApplication(id: number) {
  const body = {
    aid: id
  }

  const responseRaw = await fetch(`${baseUrl}/api/application?${getRequestRow(body)}`, createOptions('GET'))
  const response = await responseRaw.json() as ApplicationRaw

  return response;
}

async function fetchGetAllUserApplication(id: number) {
  const body = {
    uid: id
  }

  const responseRaw = await fetch(`${baseUrl}/api/all_application_user?${getRequestRow(body)}`, createOptions('GET'))
  const response = await responseRaw.json() as ApplicationRaw[]

  return response;
}

async function fetchGetAllAdminApplication(id: number) {
  const body = {
    uid: id
  }

  const responseRaw = await fetch(`${baseUrl}/api/all_application_admin?${getRequestRow(body)}`, createOptions('GET'))
  const response = await responseRaw.json() as ApplicationRaw[]

  return response;
}

// Status
async function fetchChangeStatus(aid: number, statusId: number) {
  const body = {
    aid: aid,
    status_id: statusId
  }

  const responseRaw = await fetch(`${baseUrl}/api/change_status`, createOptions('PUT', body))
  const response = await responseRaw.json() as {
    result?: boolean,
  }

  return response;
}

// Status
async function fetchSendMessage(text: string, senderId: number, applicationId: number) {
  const body = {
    text: text,
    sender_id: senderId,
    application_id: applicationId
  }

  const responseRaw = await fetch(`${baseUrl}/api/send_message`, createOptions('POST', body))
  const response = await responseRaw.json() as {
    result?: boolean,
  }

  return response;
}


// All exports
export const fetches = {
  auth: fetchAuth,
  createApplication: fetchCreateApplication,
  changeStatus: fetchChangeStatus,
  getApplication: fetchGetApplication,
  getAllUserApplication: fetchGetAllUserApplication,
  getAllAdminApplication: fetchGetAllAdminApplication,
  sendMessage: fetchSendMessage
}