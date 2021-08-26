const container = document.getElementsByClassName('char-cont');
const pager = document.getElementById('page')
const statusAtl = document.getElementById('status')
const genero = document.getElementById('gender')
const locationAtl = document.getElementById('location')
const stsText = document.getElementById('Status-drop')
const gdrText = document.getElementById('Gender-drop')
const lctText = document.getElementById('Location-drop')
const btnNext = document.getElementById('nextPage')
const btnBack = document.getElementById('backPage')

btnNext.addEventListener('click', () => {
  page += 1
  pagination()
})
btnBack.addEventListener('click', () => {
  page -= 1;
  pagination()
})

document.getElementById('status-all').addEventListener('click', () => {
  page = 1
  stsText.innerText = 'Status'
  pagination()
})
document.getElementById('gender-all').addEventListener('click', () => {
  page = 1
  gdrText.innerText = 'Gender'
  pagination()
})
document.getElementById('location-all').addEventListener('click', () => {
  page = 1
  lctText.innerText = 'Location'
  pagination()
})


let pageArr = []
let page = 1;
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
      filtStatus.addEventListener('click', (event) => {
        page = 1
        stsText.innerText = event.target.innerText
        pagination()
      })
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
      filtGen.addEventListener('click', (event) => {
        page = 1
        gdrText.innerText = event.target.innerText
        pagination()
      })
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
      filtLoc.id = atual
      filtLoc.innerText = atual
      filtLoc.addEventListener('click', (event) => {
        page = 1
        lctText.innerText = event.target.innerText
        pagination()
      })
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
  return charList.filter((cur) => cur.location.name === tipo)
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
          locArr.push(cur.location.name)
          console.log(cur.location.name)
        });
        listStatus()
        listGender()
        listLocation()
      })
  }
}

const remEmpty = () => {
  if (!document.getElementsByClassName('empty')[0]) {} else {
    container[0].classList.remove('empty')

  }
}

const putChar = () => {
  remEmpty()
  if (paginationArr.length === 0) {
    container[0].classList.add('empty')
    let par = document.createElement('h3')
    par.innerText = 'Nenhum resultado encontrado'
    container[0].appendChild(par)
  }
  paginationArr.forEach((cur) => {
    const box = document.createElement('section')
    box.classList.add('char-box')
    const imagem = document.createElement('img')
    imagem.src = cur.image;
    box.appendChild(imagem)
    const divInfo = document.createElement('div')
    divInfo.classList.add('char-info')
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


let paginationArr = []

const pagination = () => {
  let filtrados = filtroLive(filtroGenero(filtroStatus(charJSON, stsText.innerText), gdrText.innerText), lctText.innerText)
  if (page === 1) {
    btnBack.classList.add('disabled')
  } else {
    btnBack.classList.remove('disabled')
  }
  if (page >= Math.ceil(filtrados.length / 15)) {
    btnNext.classList.add('disabled')
  } else {
    btnNext.classList.remove('disabled')
  }
  changePage();
  paginationArr = []
  pager.innerText = `${page} / ${Math.ceil(filtrados.length/15)}`
  let indice = 15 * page - 15
  for (let i = indice; i < page * 15; i += 1) {
    if (filtrados[i] !== undefined) {
      paginationArr.push(filtrados[i])
    }
  }
  putChar()

}

const changePage = () => {
  while (container[0].firstChild) {
    container[0].removeChild(container[0].firstChild)
  }
}
const ordenado = async () => {
  await display()
    .then(() => {
      pagination()
    })
}
ordenado()

//próximo passo é ordenar
module.exports = {
  // listStatus,
  // listGender,
  // listLocation,
  filtroStatus,
  filtroGenero,
  filtroLive,

}