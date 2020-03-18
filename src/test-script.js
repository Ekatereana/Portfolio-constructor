'use strict'

// link to area where will be all action
const dropArea = document.getElementById('drop-area')

;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false)
})

function preventDefaults (e) {
  e.preventDefault()
  e.stopPropagation()
}

;['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false)
})

;['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false)
})

function highlight (e) {
  dropArea.classList.add('highlight')
}

function unhighlight (e) {
  dropArea.classList.remove('highlight')
}

dropArea.addEventListener('drop', handleDrop, false)

function handleDrop (e) {
  const dt = e.dataTransfer
  const files = dt.files

  handleFiles(files)
}

function handleFiles (files) {
  files = [...files]
  files.forEach(uploadFile)
  files.forEach(previewFile)
}

function previewFile (file) {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = function () {
    const img = document.createElement('img')
    img.src = reader.result
    document.getElementById('gallery').appendChild(img)
  }
}

function uploadFile (file) {
  console.log('Start uploading')
  var url = '/'
  var xhr = new XMLHttpRequest()
  var formData = new FormData()
  xhr.open('POST', url, true)

  xhr.addEventListener('readystatechange', function (e) {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log('alright')
    } else if (xhr.readyState === 4 && xhr.status !== 200) {
      // Ошибка. Информируем пользователя
    }
  })

  formData.append('file', file)
  xhr.send(formData)
}
