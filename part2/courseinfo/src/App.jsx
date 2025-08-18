const Header = ({name}) => <h1>{name}</h1>

const Content = ({parts}) => {
  const nexercise = parts.reduce((s,p) => s + p.exercises, 0)
  return (
    <div>
      {parts.map( (part, i) =>  <Part part={part} key={i} /> )}
      <p>total of {nexercise} exercises</p>
    </div>
  )
}

const Part = ({part}) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const CourseSingle = ({course}) => (
  <>
    <Header name={course.name} />
    <Content parts={course.parts} />
  </>
)

const Course = ({courses}) => (
  courses.map((course, i) => (
    <CourseSingle key={i} course={course} />
  ) )
)

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Course courses={courses} />
}

export default App
