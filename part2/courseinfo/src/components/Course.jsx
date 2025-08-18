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

export default Course
