import Header from './Header'
import Content from './Content'

const Course = ({course}) => {
    const total = course.parts.map(x => x.exercises).reduce((s, p) => s + p)
    return (
      <div>
        <Header title={course.name}/>
        <Content parts={course.parts}/>
        <p>total of {total} exercises</p>
      </div>
    )
  }

export default Course