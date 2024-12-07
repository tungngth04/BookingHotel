import { useState } from 'react'
import ApexCharts from 'react-apexcharts'
import { getBookingStatus } from '../../apis/statistic.api'
import './statisticBookingStatus.scss'
import toast from 'react-hot-toast'

const StatisticBookingStatus = () => {
  const [fromMonth, setFromMonth] = useState(11)
  const [year, setYear] = useState(new Date().getFullYear())
  const [isLoading, setIsLoading] = useState(false)
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'donut',
        height: 400,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
      labels: ['Cancelled', 'Checked In', 'Checked Out', 'Pending'],
      legend: {
        position: 'bottom',
        fontSize: '16px',
        markers: {
          width: 16,
          height: 16,
        },
        itemMargin: {
          horizontal: 10,
          vertical: 5,
        },
        labels: {
          colors: '#333',
          useSeriesColors: false,
        },
      },
      dataLabels: {
        enabled: true,
        formatter: (val, opts) => {
          const total = opts.w.globals.series.reduce((a, b) => a + b, 0)
          const currentValue = opts.w.globals.series[opts.seriesIndex]
          if (total === 0) return '0%'
          const percentage = ((currentValue / total) * 100).toFixed(1)
          return `${percentage}%`
        },
        style: {
          fontSize: '14px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 'bold',
          colors: ['#fff'],
        },
      },

      stroke: {
        width: 0,
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
      month: fromMonth,
      year: year,
    }
    setIsLoading(true)
    try {
      const response = await getBookingStatus(params)
      const bookingStatus = response.data.data

      const totalBookingCancel = bookingStatus.totalBookingCancel || 0
      const totalBookingCheckin = bookingStatus.totalBookingCheckin || 0
      const totalBookingCheckout = bookingStatus.totalBookingCheckout || 0
      const totalBookingPending = bookingStatus.totalBookingPending || 0

      if (
        !totalBookingCancel &&
        !totalBookingCheckin &&
        !totalBookingCheckout &&
        !totalBookingPending
      ) {
        toast.error('Không có dữ liệu đặt phòng cho tháng và năm đã chọn')
      }

      setChartData((prevState) => ({
        ...prevState,
        series: [
          totalBookingCancel,
          totalBookingCheckin,
          totalBookingCheckout,
          totalBookingPending,
        ],
      }))
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
          <h2>Thống kê trạng thái đặt phòng</h2>
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

            <button onClick={handleFetchData} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Fetch Data'}
            </button>
          </div>

          {chartData.series.length > 0 && chartData.series.some((value) => value > 0) ? (
            <ApexCharts
              options={chartData.options}
              series={chartData.series}
              type='donut'
              height={350}
            />
          ) : (
            !isLoading && (
              <div className='no-data'>
                <span>Không có dữ liệu đặt phòng cho tháng và năm đã chọn</span>
                <ApexCharts
                  options={chartData.options}
                  series={chartData.series}
                  type='donut'
                  height={350}
                />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default StatisticBookingStatus
