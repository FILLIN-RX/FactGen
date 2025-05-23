<script setup>
import { Bar , Line} from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  LineElement,
  scales
} from 'chart.js'
import { ref,onMounted } from 'vue'


ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale,LineElement,PointElement,ArcElement)
const lineChartKey = ref(0)
const chartData = {
  labels: ['Janvier', 'Février', 'Mars','Avril','Mai'],
  datasets: [
    {
      label: 'TTC ($)',
      data: [1200, 1800, 1400],
      fill:false,
      backgroundColor: '#60a5fa',
    },
  ],
}
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
}
const revenuchartData = {
  labels: ['Janvier', 'Février', 'Mars','Avril','Mai'],
  datasets: [
    {
      label: 'Revenue ($)',
      data: [1200, 1800, 1400, 3000, 6000],
      fill:false,
      backgroundColor: '#60a5fa',
      tension:0.4
    },
  ],
}
const lineChartOption = ref({
    responsive:true,
    maintainAspectRatio:false,
    Animation: {
        tension:{
            duration:5000,
            easing:'linear',
            from:1,
            to:0,
            loop:false
        }
    },
    plugin:{
        legend:{
            labels:{
                color:'#64748b'
            }
        }
    },
    scales:{
        x:{
            grid:{
                color:'rgba(0,0,0,0.1)'
            },
            ticks:{
                color:'#64748b'
            }

        },
        y:{
            grid:{
                color:'rgba(0,0,0,0.1)'
            },
            ticks:{
                color:'#64748b'
            }

        }
    }
})
onMounted(()=>{
    lineChartKey.value ++;
})


</script>

<template>
  <div style="height: 300px;">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
  <div class="bg-black/10 p-6  rounded-xl shadow-md">
    <h2 class="text-lg font-semibold mb-4">Monthly Revenue</h2>
    <Line :data="revenuchartData" :options="lineChartOption" class="max-h-[300px]" :key="lineChartKey" />
  </div>
</template>
