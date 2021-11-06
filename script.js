const visualizer = document.getElementById('visualizer')
const peak = document.getElementById('peak')

const context = new AudioContext()
const analyserNode = new AnalyserNode(context, { fftSize: 32 })

setupContext()
drawVisualizer()

async function setupContext() {
  const audio = await getAudio()
  if (context.state === 'suspended') {
    await context.resume()
  }
  const source = context.createMediaStreamSource(audio)
  source
    .connect(analyserNode)
}

function getAudio() {
  return navigator.mediaDevices.getUserMedia({audio:true})
}

function drawVisualizer() {
  requestAnimationFrame(drawVisualizer)

  const bufferLength = analyserNode.frequencyBinCount
  const dataArray = new Uint8Array(bufferLength)
  analyserNode.getByteFrequencyData(dataArray)

  dataArray.forEach((item, index) => {
  })

  const value = dataArray[0] / 255 * 100
  visualizer.style.width = value + 'vw'
  visualizer.style.backgroundColor = `hsl(${dataArray[0] / 255 * 360}, 100%, 50%)`
}