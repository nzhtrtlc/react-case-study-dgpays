import './Grid.sass'
import { Candidate } from "../types";

type Props = {
  source: Candidate[]
}

export default function Grid(props: Props) {
  const bgRed = {
    backgroundColor: 'red'
  }
  return (
    <table className='table'>
      <thead>
      <tr>
        <th>Name</th>
        <th>Mail Received Date</th>
        <th>Solution Sent Date</th>
      </tr>
      </thead>
      <tbody>
      {props.source.map((data: Candidate, index) =>
        <tr key={index} style={data.isBackgroundColorRed && bgRed}>
          <td className='name'>{data.name}</td>
          <td className='mailReceivedDate'>{data.mailReceivedDate}</td>
          <td className='solutionSentDate'>{data.solutionSentDate}</td>
        </tr>
      )}
      </tbody>

    </table>

  )
}
