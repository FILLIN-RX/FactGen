<template>
    <div class="grid lg:grid-cols-2 gap-6 p-6">
        

        <!-- Agency Sales -->
        <div class="bg-white p-6 rounded-xl shadow">
            <h2 class="text-lg font-semibold text-gray-700 mb-4">Agency Sales</h2>
            <div style="height: 300px;">
                <Bar :data="barChartData" :options="chartOptions" />
            </div>
        </div>

        <!-- Revenue Breakdown -->
        <div class="bg-white p-6 rounded-xl shadow">
            <h2 class="text-lg font-semibold text-gray-700 mb-4">Revenue Breakdown</h2>
            <div style="height: 300px;">
                <Doughnut :data="donutChartData" :options="donutOptions" />
            </div>
        </div>

        <!-- Yearly Revenue (stacked) -->
        <div class="bg-white p-6 rounded-xl shadow col-span-1">
            <h2 class="text-lg font-semibold text-gray-700 mb-4">Yearly Revenue</h2>
            <div style="height: 350px;">
                <Bar :data="stackedData" :options="stackedOptions" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { Bar, Doughnut } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title, Tooltip, Legend,
    BarElement, CategoryScale, LinearScale,
    ArcElement
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)

const expenses = [
    { label: 'Marketing', value: 45 },
    { label: 'Operations', value: 29 },
    { label: 'Licensing', value: 23 }
]

function getDonutData(pourcentage) {
    return {
        labels: ['Used', 'Remaining'],
        datasets: [{
            data: [pourcentage, 100 - pourcentage],
            backgroundColor: ['#3b82f6', '#e5e7eb'],
            borderWidth: 0
        }]
    }
}

const donutOptions = {
    cutout: '70%',
    plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
    }
}

const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
        label: 'Agency Sales',
        data: [10, 12, 15, 18, 22, 28],
        backgroundColor: '#3b82f6'
    }]
}

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: { ticks: { color: '#64748b' }, grid: { color: 'rgba(0,0,0,0.05)' } },
        y: { ticks: { color: '#64748b' }, grid: { color: 'rgba(0,0,0,0.05)' } }
    },
    plugins: { legend: { labels: { color: '#64748b' } } }
}

const donutChartData = {
    labels: ['Produits', 'Services', 'Frais', 'Autres'],
    datasets: [{
        data: [50, 25, 15, 10],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']
    }]
}

const stackedData = {
    labels: ['2010', '2015', '2020'],
    datasets: [
        {
            label: 'Services',
            data: [100, 200, 300],
            backgroundColor: '#3b82f6',
            stack: 'stack1'
        },
        {
            label: 'Produits',
            data: [50, 150, 200],
            backgroundColor: '#10b981',
            stack: 'stack1'
        },
        {
            label: 'Frais',
            data: [20, 40, 60],
            backgroundColor: '#f59e0b',
            stack: 'stack1'
        }
    ]
}

const stackedOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: { stacked: true },
        y: { stacked: true }
    },
    plugins: {
        legend: { position: 'top' },
        tooltip: { mode: 'index', intersect: false }
    }
}
</script>

<style scoped></style>