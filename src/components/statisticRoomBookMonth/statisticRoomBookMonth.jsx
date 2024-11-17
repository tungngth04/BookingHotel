import { useState } from 'react'
import ApexCharts from 'react-apexcharts'
import { getRoomBookMonth } from '../../apis/statistic.api'
import './statisticRoomBookMonth.scss'
import toast from 'react-hot-toast'

const StatisticRoomBookMonth = () => {
  const [fromMonth, setFromMonth] = useState(11)
  const [year, setYear] = useState(new Date().getFullYear())
  const [pageSize, setPageSize] = useState(10)
  const [isLoading, setIsLoading] = useState(false)
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          columnWidth: '50%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 0,
      },
      grid: {
        row: {
          colors: ['#fff', '#f2f2f2'],
        },
      },
      xaxis: {
        categories: [],
        labels: {
          rotate: -45,
        },
        tickPlacement: 'on',
      },
      yaxis: {
        title: {
          text: 'Bookings',
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'horizontal',
          shadeIntensity: 0.25,
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [50, 0, 100],
        },
      },
    },
  })

  const handleFetchData = async () => {
    const params = {
      pageSize: pageSize,
      month: fromMonth,
      year: year,
    }
    setIsLoading(true)
    try {
      const response = await getRoomBookMonth(params)
      const roomBookingData = response.data.data.items

      if (!roomBookingData || roomBookingData.length === 0) {
        setChartData((prevState) => ({
          ...prevState,
          series: [],
          options: { ...prevState.options, xaxis: { categories: [] } },
        }))
      } else {
        const roomNames = roomBookingData.map((item) => item.room.name)
        const bookingValues = roomBookingData.map((item) => item.value)

        setChartData((prevState) => ({
          ...prevState,
          series: [
            {
              name: 'Bookings',
              data: bookingValues,
            },
          ],
          options: {
            ...prevState.options,
            xaxis: {
              categories: roomNames,
            },
          },
        }))
      }
    } catch (error) {
      toast.error('Lỗi lấy dữ liệu')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='home-statistic'>
      <div className='box-statistic'>
        <div className='statistic-admin'>
          <h2>Thống kê phòng đặt trong tháng</h2>
          <div className='filters'>
            <div>
              <label>From Month: </label>
              <select
                className='select-data'
                value={fromMonth}
                onChange={(e) => {
                  setFromMonth(Number(e.target.value))
                  setChartData({ ...chartData, series: [] })
                }}>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(0, i).toLocaleString('en-US', { month: 'long' })}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Year: </label>
              <input
                type='number'
                value={year}
                className='input-data'
                onChange={(e) => {
                  setYear(Number(e.target.value))
                  setChartData({ ...chartData, series: [] })
                }}
                min='2000'
                max='2100'
              />
            </div>

            <div>
              <label>Page Size: </label>
              <input
                type='number'
                value={pageSize}
                className='input-data'
                onChange={(e) => {
                  setPageSize(Number(e.target.value))
                }}
                min='1'
                max='500'
              />
            </div>

            <button onClick={handleFetchData} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Fetch Data'}
            </button>
          </div>

          {chartData.series.length > 0 ? (
            <ApexCharts
              options={chartData.options}
              series={chartData.series}
              type='bar'
              height={350}
            />
          ) : (
            !isLoading && (
              <p className='no-data'>
                {' '}
                <ApexCharts
                  options={chartData.options}
                  series={chartData.series}
                  type='bar'
                  height={350}
                />
              </p>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default StatisticRoomBookMonth
