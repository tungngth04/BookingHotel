import { useState, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'
import { getTopBooking } from '../../apis/statistic.api'
import toast from 'react-hot-toast'
import './statisticTopBooking.scss'

const StatisticTopBooking = () => {
  const [chartOptions, setChartOptions] = useState({})
  const [chartSeries, setChartSeries] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleFetchData = async () => {
    setIsLoading(true)
    try {
      const respone = await getTopBooking()
      const data = respone?.data?.data || []

      if (data.length > 0) {
        const topData = data.sort((a, b) => b.value - a.value).slice(0, 10)

        const categories = topData.map((item) => item.user.lastName)
        const values = topData.map((item) => item.value)

        setChartOptions({
          chart: {
            width: 380,
            type: 'pie',
            offsetY: 20,
          },
          labels: categories,
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
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: { width: 200 },
                legend: { position: 'bottom' },
              },
            },
          ],
        })

        setChartSeries(values)
      } else {
        toast.error('Không có dữ liệu để hiển thị')
      }
    } catch (error) {
      toast.error('Lỗi lấy dữ liệu')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    handleFetchData()
  }, [])

  return (
    <div className='home-statistic'>
      <div className='box-statistic'>
        <div className='statistic-admin'>
          <div className='statistic-top-booking'>
            <h3
              style={{
                textAlign: 'left', // Căn trái
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#1E90FF',
                marginBottom: '10px', // Tạo khoảng cách với biểu đồ
              }}>
              Top 10 Khách Hàng Đặt Chỗ Nhiều Nhất
            </h3>
            {isLoading ? (
              <p>Đang tải dữ liệu...</p>
            ) : (
              <div id='chart'>
                {chartSeries.length > 0 ? (
                  <ReactApexChart
                    options={chartOptions}
                    series={chartSeries}
                    type='pie'
                    height={400}
                  />
                ) : (
                  <p>Không có dữ liệu</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatisticTopBooking
