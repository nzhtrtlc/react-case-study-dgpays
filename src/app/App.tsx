import './App.sass'
import Grid from './components/Grid'
import dataList from './data.json'

function dateDiffInDays(a, b) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY)
}

function control(today: Date, limit: number) {
  const allTrs = [...document.querySelectorAll('table tr')]
  let wrongEntryCount = 0
  for (let i = 1; i < allTrs.length; i++) {
    const tr = allTrs[i]
    //const name = tr.querySelector('.name').innerText
    const mailReceivedDate = tr.querySelector('.mailReceivedDate').innerText
    const solutionSentDate = tr.querySelector('.solutionSentDate').innerText

    const date1 = new Date(mailReceivedDate)
    let date2 = new Date(solutionSentDate)

    if (solutionSentDate.trim().length === 0) {
      date2 = new Date(today)
    }
    const dayDiffTotal = dateDiffInDays(date1, date2)

    const bgColor = tr.style.backgroundColor

    if (dayDiffTotal <= 5) {
      if (bgColor === 'red') {
        wrongEntryCount++
      }
      tr.style.backgroundColor = 'initial'
    } else {
      if (bgColor != 'red') {
        wrongEntryCount++
      }
      tr.style.backgroundColor = 'red'
    }
  }
  const resultText = `Toplam ${wrongEntryCount} adet hatali satir bulundu`
  const resultHtml = document.querySelector('.result') as HTMLElement

  resultHtml.innerText = resultText
  resultHtml.style.display = 'block'
}

function App() {
  return (
    <main>
      <Grid source={dataList}/>
      <button onClick={() => {
        const date = new Date('2021-10-06')
        control(date, 5)
      }}>Calculate
      </button>
      <p className='result'></p>
    </main>
  )
}

export default App
