import { useState } from 'react'
import ApexCharts from 'react-apexcharts'
import { getRevenue } from '../../apis/statistic.api'
import './statisticAdmin.scss'
import toast from 'react-hot-toast'

const StatisticAdmin = () => {
  const [fromMonth, setFromMonth] = useState(1)
  const [toMonth, setToMonth] = useState(12)
  const [year, setYear] = useState(new Date().getFullYear())
  const [isLoading, setIsLoading] = useState(false)
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'line',
        height: 350,
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 1000,
        },
      },
      xaxis: {
        categories: [],
      },
      title: {
        text: 'Revenue Statistics',
        align: 'center',
      },
      stroke: {
        curve: 'smooth',
      },
      markers: {
        size: 5,
      },
      grid: {
        show: true,
      },
      tooltip: {
        enabled: true,
      },
    },
  })

  const handleFetchData = async () => {
    const params = { fromMonth, toMonth, year }
    setIsLoading(true)
    try {
      const response = await getRevenue(params)
      const revenueData = response.data.data

      if (!revenueData || revenueData.length === 0) {
        setChartData((prevState) => ({
          ...prevState,
          series: [],
          options: { ...prevState.options, xaxis: { categories: [] } },
        }))
      } else {
        const filteredData = revenueData.filter((item) => item.month)
        const months = filteredData.map((item) => item.month)
        const totalRevenue = filteredData.map((item) => item.totalRevenue)
        const totalBooking = filteredData.map((item) => item.totalBooking)

        setChartData((prevState) => ({
          ...prevState,
          series: [
            { name: 'Total Revenue', data: totalRevenue },
            { name: 'Total Booking', data: totalBooking },
          ],
          options: {
            ...prevState.options,
            xaxis: {
              categories: months,
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
          <h2>Thống kê doanh thu</h2>

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
              <label>To Month: </label>
              <select
                value={toMonth}
                className='select-data'
                onChange={(e) => {
                  setToMonth(Number(e.target.value))
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

            <button onClick={handleFetchData} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Fetch Data'}
            </button>
          </div>

          {chartData.series.length > 0 ? (
            <ApexCharts
              key={JSON.stringify(chartData)}
              options={chartData.options}
              series={chartData.series}
              type='line'
              height={350}
            />
          ) : (
            !isLoading && (
              <p className='no-data'>
                {' '}
                <ApexCharts
                  key={JSON.stringify(chartData)}
                  options={chartData.options}
                  series={chartData.series}
                  type='line'
                  height={350}
                />
                .
              </p>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default StatisticAdmin
