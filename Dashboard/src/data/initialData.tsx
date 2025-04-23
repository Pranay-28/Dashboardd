import { DashboardData } from '../types';

export const initialData: DashboardData = {
  categories: [
    {
      id: 'cnapp-dashboard',
      name: 'CNAPP Dashboard',
      widgets: [
        {
          id: 'cloud-accounts',
          name: 'Cloud Accounts',
          content: 'Connected (2)\nNot Connected (3)',
          type: 'chart'
        }
      ]
    },
    {
      id: 'cspm-executive',
      name: 'CSPM Executive Dashboard',
      widgets: [
        {
          id: 'cloud-account-risk',
          name: 'Cloud Account Risk Assessment',
          content: 'Failed (104)\nWarning (382)\nNot available (34)\nPassed (7455)',
          type: 'donut'
        }
      ]
    },
    {
      id: 'cwpp-dashboard',
      name: 'CWPP Dashboard',
      widgets: [
        {
          id: 'top-namespace',
          name: 'Top 5 Namespace Specific Assets',
          content: 'No Graph data available!',
          type: 'graph'
        },
        {
          id: 'workload-alerts',
          name: 'Workload Alerts',
          content: 'No Graph data available!',
          type: 'graph'
        }
      ]
    },
    {
      id: 'registry-scan',
      name: 'Registry Scan',
      widgets: [
        {
          id: 'image-risk',
          name: 'Image Risk Assessment',
          content: 'Low (5)\nMedium (10)\nHigh (15)',
          type: 'risk'
        },
        {
          id: 'image-security',
          name: 'Image Security Issues',
          content: 'Critical (2)\nHigh (2)',
          type: 'security'
        }
      ]
    }
  ]
};