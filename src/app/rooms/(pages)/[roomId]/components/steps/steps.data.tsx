interface StepData {
  id: string
  urlName: string
  totalMount: number
}

export const stepsData = ({ id, urlName, totalMount }: StepData) => {
  const baseUrlSteps = `/rooms/${id}`

  return [
    {
      ref: baseUrlSteps,
      RenderStep: <p>Habitación</p>,
      isActive: urlName.startsWith(baseUrlSteps),
      value: 1
    },
    {
      ref: `${baseUrlSteps}/requirements`,
      RenderStep: <p>Requisitos</p>,
      isActive: urlName === `${baseUrlSteps}/requirements`,
      value: 2
    },
    {
      ref: `${baseUrlSteps}/pay`,
      RenderStep: (
        <div>
          <span>Total</span>
          <h5>PEN {totalMount}</h5>
        </div>
      ),
      isActive: urlName === `${baseUrlSteps}/pay`,
      value: 3
    }
  ]
}
