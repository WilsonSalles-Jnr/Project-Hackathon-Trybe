const container = document.getElementsByClassName('char-cont');
const statusAtl = document.getElementById('status')
const genero = document.getElementById('gender')
const locationAtl = document.getElementById('location')
const stsText = document.getElementById('Status-drop')
const gdrText = document.getElementById('Gender-drop')
const lctText = document.getElementById('Location-drop')

let statusCalled = false
let genderCalled = false
let locationCalled = false
let stsArr = []
let arr = []
let locArr = []
let stsShort = []
let genderArr = []
let locShort = []

const listStatus = () => {
  if (statusCalled === false) {
    statusCalled = true;
    return stsShort = [...new Set(stsArr)].forEach((atual) => {
      const filtStatus = document.createElement('li')
      filtStatus.classList.add('dropdown-item')
      filtStatus.id = atual
      filtStatus.innerText = atual
      statusAtl.appendChild(filtStatus)
    })
  }
}

const listGender = () => {
  if (genderCalled === false) {
    genderCalled = true;
    return genderArr = [...new Set(arr)].forEach((atual) => {
      const filtGen = document.createElement('li')
      filtGen.classList.add('dropdown-item')
      filtGen.id = atual
      filtGen.innerText = atual
      genero.appendChild(filtGen)
    })
  }
}

const listLocation = () => {
  if (locationCalled === false) {
    locationCalled = true;
    return locShort = [...new Set(locArr)].forEach((atual) => {
      const filtLoc = document.createElement('li')
      filtLoc.classList.add('dropdown-item')
      filtLoc.id = atual.name
      filtLoc.innerText = atual.name
      locationAtl.appendChild(filtLoc)
    })
  }
}

const filtroStatus = (charList, tipo) => {
  if (tipo === 'All' || tipo === 'Status') {
    return charList
  }
  return charList.filter((cur) => cur.status === tipo)
}
const filtroGenero = (charList, tipo) => {
  if (tipo === 'All' || tipo === 'Gender') {
    return charList
  }
  return charList.filter((cur) => cur.gender === tipo)
}
const filtroLive = (charList, tipo) => {
  if (tipo === 'All' || tipo === 'Location') {
    return charList
  }
  return charList.filter((cur) => cur.location === tipo)
}
const filtred = (param) => {
  filtroLive(filtroGenero(filtroStatus(param, stsText.innerText), gdrText.innerText), lctText.innerText)
}

const charJSON = []

const display = async () => {
    for (let i = 1; i < 35; i += 1) {
    indexer = i
    const url = `https://rickandmortyapi.com/api/character/?page=${indexer}`
    await fetch(url).then((called) => called.json())
      .then((dados) => {
        dados.results.forEach(cur => {

          charJSON.push({
            name: cur.name,
            status: cur.status,
            gender: cur.gender,
            location: cur.location,
            image: cur.image
          })

          stsArr.push(cur.status)
          arr.push(cur.gender)
          locArr.push(cur.location)

          // const box = document.createElement('section')
          // box.classList.add('char-box')
          // const imagem = document.createElement('img')
          // imagem.src = cur.image;
          // box.appendChild(imagem)
          // const divInfo = document.createElement('div')
          // const namer = document.createElement('h4')
          // namer.innerText = `Name: ${cur.name}`
          // const stts = document.createElement('p')
          // stts.innerText = `■ Status: ${cur.status}`
          // if (cur.status === 'Alive') {
          //   stts.classList.add('alive')
          // } else if (cur.status === 'unknown') {
          //   stts.classList.add('unknow')
          // } else {
          //   stts.classList.add('dead')
          // }
          // const gnr = document.createElement('p');
          // gnr.innerText = `Gender: ${cur.gender}`
          // const lcl = document.createElement('p')
          // lcl.innerText = `Location: ${cur.location.name}`
          // divInfo.appendChild(namer)
          // divInfo.appendChild(stts)
          // divInfo.appendChild(gnr)
          // divInfo.appendChild(lcl)
          // box.appendChild(divInfo)
          // container[0].appendChild(box)
        });
        listStatus()
        listGender()
        listLocation()
      })
  }
}

const putChar = () =>{
  charJSON.forEach((cur)=>{
    const box = document.createElement('section')
          box.classList.add('char-box')
          const imagem = document.createElement('img')
          imagem.src = cur.image;
          box.appendChild(imagem)
          const divInfo = document.createElement('div')
          const namer = document.createElement('h4')
          namer.innerText = `Name: ${cur.name}`
          const stts = document.createElement('p')
          stts.innerText = `■ Status: ${cur.status}`
          if (cur.status === 'Alive') {
            stts.classList.add('alive')
          } else if (cur.status === 'unknown') {
            stts.classList.add('unknow')
          } else {
            stts.classList.add('dead')
          }
          const gnr = document.createElement('p');
          gnr.innerText = `Gender: ${cur.gender}`
          const lcl = document.createElement('p')
          lcl.innerText = `Location: ${cur.location.name}`
          divInfo.appendChild(namer)
          divInfo.appendChild(stts)
          divInfo.appendChild(gnr)
          divInfo.appendChild(lcl)
          box.appendChild(divInfo)
          container[0].appendChild(box)
  })
}
const ordenado = async () =>{
  await display()
  .then(()=>{
    putChar()
  })
}
ordenado()
// const callChars = () => {
//     let indexer = 1
//     display().then(() => {
//           // return new Promise(()=>{
//           // console.log(charJSON[0].name)

//           // })
//           // let par = document.createElement('p')
//           // par.innerText = charJSON[0].name
//           // container[0].appendChild(par)
//           // })
//           // console.log(charJSON)

//         }

//         const callPage = () => {

//         }

//         callChars()