import { Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { FaChartLine, FaDollarSign, FaShoppingCart } from 'react-icons/fa';
import { format, subDays } from 'date-fns';
import { useState } from 'react';
import { Card } from './DashBoardCards';
import { FaRupeeSign } from 'react-icons/fa6';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SalesPerformanceCard = ({ salesLast7Days, salesLast30Days }) => {
  const [show30Days, setShow30Days] = useState(false);
  const activeData = show30Days ? salesLast30Days : salesLast7Days;
  const days = show30Days ? 30 : 7;

  // Process data to fill missing dates
  const processData = (data, days) => {
    const dateMap = {};
    const endDate = new Date();
    const startDate = subDays(endDate, days - 1);

    // Create empty entries for all dates
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateKey = format(d, 'yyyy-MM-dd');
      dateMap[dateKey] = { totalSales: 0, count: 0 };
    }

    // Merge with actual data
    data.forEach(entry => {
      dateMap[entry._id] = entry;
    });

    return Object.entries(dateMap).map(([date, values]) => ({
      date: format(new Date(date), 'MMM dd'),
      ...values
    }));
  };

  const chartData = processData(activeData, days);

  // Chart configuration
  const data = {
    labels: chartData.map(d => d.date),
    datasets: [
      {
        label: 'Total Sales',
        data: chartData.map(d => d.totalSales),
        backgroundColor: '#6366f1',
        borderRadius: 8,
        borderSkipped: false,
      },
      {
        label: 'Number of Sales',
        data: chartData.map(d => d.count),
        backgroundColor: '#10b981',
        borderRadius: 8,
        borderSkipped: false,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 12,
          padding: 16,
          usePointStyle: true,
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.parsed.y || 0;
            return `${label}: ${label.includes('Total') ? `${value.toLocaleString()}` : value}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#6b7280' }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#6b7280',
          callback: (value) => `pkr ${value.toLocaleString()}`
        },
        grid: { color: '#f3f4f6' }
      }
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Chart Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setShow30Days(false)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            !show30Days 
              ? 'bg-indigo-100 text-indigo-600'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <FaShoppingCart className="text-sm" />
          <span className="text-sm font-medium">7 Days</span>
        </button>
        <button
          onClick={() => setShow30Days(true)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            show30Days 
              ? 'bg-emerald-100 text-emerald-600'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <FaRupeeSign className="text-sm" />
          <span className="text-sm font-medium">30 Days</span>
        </button>
      </div>

      {/* Chart Container */}
      <div className="relative flex-1">
        <Bar data={data} options={options} />
      </div>

      {/* Summary Stats */}
      <div className="flex gap-4 mt-4 pt-4 border-t border-gray-100">
        <div className="flex-1 text-center">
          <div className="text-gray-500 text-sm">Total Sales</div>
          <div className="text-xl font-semibold text-gray-800">
            pkr{chartData.reduce((sum, d) => sum + d.totalSales, 0).toLocaleString()}
          </div>
        </div>
        <div className="flex-1 text-center">
          <div className="text-gray-500 text-sm">Total Orders</div>
          <div className="text-xl font-semibold text-gray-800">
            {chartData.reduce((sum, d) => sum + d.count, 0).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};


const SalesCardWrapper = ({ salesLast7Days, salesLast30Days }) => (
  <Card title="Sales Performance">
    <div className="h-64">
      {salesLast7Days.length > 0 || salesLast30Days.length > 0 ? (
        <SalesPerformanceCard
          salesLast7Days={salesLast7Days}
          salesLast30Days={salesLast30Days}
        />
      ) : (
        <div className="h-full flex flex-col items-center justify-center text-gray-400">
          <FaChartLine className="text-4xl mb-2" />
          <p className="text-gray-500">No sales data available</p>
        </div>
      )}
    </div>
  </Card>
);

export default SalesCardWrapper