import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader
} from '@coreui/react'
import {
  CChartBar,
  // CChartLine,
  CChartDoughnut,
  // CChartRadar,
  // CChartPie,
  // CChartPolarArea
} from '@coreui/react-chartjs'
// import { DocsLink } from 'src/reusable'
import { toast } from 'react-toastify'
import LinearProgress from '@mui/material/LinearProgress';
import { getTop10RegisteredCourses, getRatioMembership } from 'src/services/statistic.services'
// import { getAllStudents } from 'src/services/user.services'

const Charts = () => {
  const [top10Courses, setTop10Courses] = useState([])
  // const [allStudents, setAllStudents] = useState([])
  const [loading, setLoading] = useState(false)
  // const allMonths = [{ '1': 0 }, { '2': 0 }, { '3': 0 }, { '4': 0 }, { '5': 0 }, { '6': 0 }, { '7': 0 }, { '8': 0 }, { '9': 0 }, { '10': 0 }, { '11': 0 }, { '12': 0 }]

  const [ratio, setRatio] = useState([])

  const top10CoursesBasedOnReg = async () => {
    setLoading(true)
    const { status, data } = await getTop10RegisteredCourses()
    if (status === 200) {
      console.log(data)
      setTop10Courses(data)
      setLoading(false)
    } else {
      toast.error('Something wrong happened')
    }
  }

  const getRatioMembershipInSystem = async () => {
    setLoading(true)
    const { status, data } = await getRatioMembership('free')
    if (status === 200) {
      console.log(data)
      const freeStudentPercent = (data.radioTypeAndAll * 100).toFixed(2)
      const paidStudentPercent = ((1 - data.radioTypeAndAll) * 100).toFixed(2)
        setRatio([freeStudentPercent, paidStudentPercent])
      setLoading(false)
    } else {
      toast.error('Something wrong happened')
    }
  }
  useEffect(() => {
    top10CoursesBasedOnReg()
    getRatioMembershipInSystem()
    // getStudentsRegAccount()
  }, [])

  // const mapRegToMonth = () => {
  //   allStudents.filter(s => !(new Date(s.createdAt).getFullYear() < new Date().getFullYear())).map(student => new Date(student.createdAt).toLocaleString('default', { month: 'narrow' })).forEach(s => {
  //     allMonths[s]++
  //   })
  // }



  return (
    <>
      {loading ? (<LinearProgress sx={{ margin: '30px 0 30px 0' }} />) : (
        <CCardGroup columns className="cols-2" >
          <CCard>
            <CCardHeader>
              Top Registered Courses
            </CCardHeader>
            <CCardBody>
              <CChartBar
                datasets={[
                  {
                    label: 'Registration counts',
                    backgroundColor: '#f87979',
                    data: top10Courses.map(c => c.numofreg)
                  }
                ]}
                labels={top10Courses.map(c => c.name)}
                options={{
                  tooltips: {
                    enabled: true
                  }
                }}
              />
            </CCardBody>
          </CCard>

          <CCard>
            <CCardHeader>
              Ratio between normal and premium users
            </CCardHeader>
            <CCardBody>
              <CChartDoughnut
                datasets={[
                  {
                    backgroundColor: [
                      '#41B883',
                      '#E46651',
                    ],
                    data: ratio
                  }
                ]}
                labels={['Normal Users', 'Premium Users']}
                options={{
                  tooltips: {
                    enabled: true
                  }
                }}
              />
            </CCardBody>
          </CCard>

          {/* <CCard>
            <CCardHeader>
              New Registration Report
            </CCardHeader>
            <CCardBody>
              <CChartLine
                datasets={[
                  {
                    label: 'New Student',
                    backgroundColor: 'rgb(0,216,255,0.9)',
                    data: [39, 80, 40, 35, 40, 20, 45]
                  }
                ]}
                options={{
                  tooltips: {
                    enabled: true
                  }
                }}
                labels="months"
              />
            </CCardBody>
          </CCard> */}

          {/* <CCard>
        <CCardHeader>
          Pie Chart
        </CCardHeader>
        <CCardBody>
          <CChartPie
            datasets={[
              {
                backgroundColor: [
                  '#41B883',
                  '#E46651',
                  '#00D8FF',
                  '#DD1B16'
                ],
                data: [40, 20, 80, 10]
              }
            ]}
            labels={['VueJs', 'EmberJs', 'ReactJs', 'AngularJs']}
            options={{
              tooltips: {
                enabled: true
              }
            }}
          />
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader>
          Polar Area Chart
        </CCardHeader>
        <CCardBody>
          <CChartPolarArea
            datasets={[
              {
                label: 'My First dataset',
                backgroundColor: 'rgba(179,181,198,0.2)',
                pointBackgroundColor: 'rgba(179,181,198,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: 'rgba(179,181,198,1)',
                pointHoverBorderColor: 'rgba(179,181,198,1)',
                data: [65, 59, 90, 81, 56, 55, 40]
              },
              {
                label: 'My Second dataset',
                backgroundColor: 'rgba(255,99,132,0.2)',
                pointBackgroundColor: 'rgba(255,99,132,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: 'rgba(255,99,132,1)',
                pointHoverBorderColor: 'rgba(255,99,132,1)',
                data: [28, 48, 40, 19, 96, 27, 100]
              }
            ]}
            options={{
              aspectRatio: 1.5,
              tooltips: {
                enabled: true
              }
            }}
            labels={[
              'Eating', 'Drinking', 'Sleeping', 'Designing',
              'Coding', 'Cycling', 'Running'
            ]}
          />
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader>
          Radar Chart
        </CCardHeader>
        <CCardBody>
          <CChartRadar
            datasets={[
              {
                label: '2019',
                backgroundColor: 'rgba(179,181,198,0.2)',
                borderColor: 'rgba(179,181,198,1)',
                pointBackgroundColor: 'rgba(179,181,198,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(179,181,198,1)',
                tooltipLabelColor: 'rgba(179,181,198,1)',
                data: [65, 59, 90, 81, 56, 55, 40]
              },
              {
                label: '2020',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                pointBackgroundColor: 'rgba(255,99,132,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(255,99,132,1)',
                tooltipLabelColor: 'rgba(255,99,132,1)',
                data: [28, 48, 40, 19, 96, 27, 100]
              }
            ]}
            options={{
              aspectRatio: 1.5,
              tooltips: {
                enabled: true
              }
            }}
            labels={[
              'Eating', 'Drinking', 'Sleeping', 'Designing',
              'Coding', 'Cycling', 'Running'
            ]}
          />
        </CCardBody>
      </CCard> */}
        </CCardGroup>
      )}
    </>

  )
}

export default Charts
