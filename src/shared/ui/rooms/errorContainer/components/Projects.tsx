// import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query'

// import { fetchProject, fetchProjects } from '../queries'

// export default function Projects({ setActiveProject }) {
//   const queryClient = useQueryClient()
//   const { data, isFetching } = useSuspenseQuery({
//     queryKey: ['projects'],
//     queryFn: fetchProjects
//   })

//   return (
//     <div>
//       <h1>Projects {isFetching ? <Spinner /> : null}</h1>
//       {data.map(project => (
//         <p key={project.name}>
//           <Button
//             onClick={() => {
//               // Prefetch the project query
//               queryClient.prefetchQuery({
//                 queryKey: ['project', project.name],
//                 queryFn: () => fetchProject(project.name)
//               })
//               setActiveProject(project.name)
//             }}
//           >
//             Load
//           </Button>{' '}
//           {project.name}
//         </p>
//       ))}
//     </div>
//   )
// }