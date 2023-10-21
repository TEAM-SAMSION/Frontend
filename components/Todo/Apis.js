export const createRandomCode = async (accessToken) => {
  let API = `/todo/team/code`
  const response = await axios.get(url + API, {
    headers: {
      Authorization: accessToken,
      'Content-Type': 'application/json;charset=UTF-8',
    },
  })
}

export const createTodoTeam = async (accessToken, name) => {
  //임시로 팀 생성하기 위해 만들어본 함수호출문 -> FormData 어렵다ㅏㅏ~~
  let API = `/todo/team`
  const randomCode = createRandomCode(accessToken)
  const teamData = new FormData()
  teamData.append('teamName', 'TestTeamName')
  teamData.append('randomCode', randomCode)

  teamData.append('petRegisters[0].name', 'testPetName')
  teamData.append('petRegisters[0].age', 2)
  teamData.append('petRegisters[0].description', 'testDescription')

  const response = await axios.post(url + API, teamData, {
    headers: {
      Authorization: accessToken,
      'Content-Type': 'multipart/form-data;charset=UTF-8; boundary=6o2knFse3p53ty9dmcQvWAIx1zInP11uCfbm',
    },
  })
  console.log(response.data)
}

export const getTodoTeamList = async (accessToken, page, size) => {
  let API = `/todo/team/list?page=${page}&size=${size}` //500
  const response = await axios.get(url + API, {
    headers: {
      Authorization: accessToken,
    },
  })
  return response.data
}

export const getTeamUsers = async (data) => {
  let tempArr = []
  const promises = data.content.map(function (team) {
    //team = {"authority": "PRESIDENT", "registerPeriod": 1, "teamId": 7, "teamName": "test", "teamProfileImageUrl": "https://pawith.s3.ap-northeast-2.amazonaws.com/9ec9d1e9-ebde-4d59-b74d-b515b04c5d98.png"}
    tempArr.push(getTeamUser(team.teamId))
  })
  await Promise.all(promises)
}
export const getTeamUser = async (teamId) => {
  console.log(teamId)
  let API = `/register/list?teamId=${teamId}`
  const response = await axios.get(url + API, {
    headers: {
      Authorization: accessToken,
    },
  })
  return response.data
}
