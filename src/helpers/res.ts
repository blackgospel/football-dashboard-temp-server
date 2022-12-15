export const createResponse = ({
  payload,
  success,
  message,
  status = 200,
}: Record<string, any>) => {
  return {
    payload,
    success,
    message,
    status,
  }
}

export const createServerResponse = (payload: any, message?: string) => {
  if (!payload) {
    return createResponse({
      payload,
      success: false,
      message,
      status: 401,
    })
  }

  return createResponse({
    payload,
    success: true,
    message,
    status: 200,
  })
}
