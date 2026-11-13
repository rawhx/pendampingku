import { getStudentReport } from './studentReport';

export function getStudentMetrics(student, observations = []) {
    return getStudentReport(student, observations).metrics.map((metric) => ({
        ...metric,
        label: `${metric.title}`,
    }));
}
