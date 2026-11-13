import {
    PolarAngleAxis,
    PolarGrid,
    PolarRadiusAxis,
    Radar,
    RadarChart,
    ResponsiveContainer,
} from 'recharts';

const shortLabels = {
    A: 'Regulasi Emosi',
    B: 'Regulasi Perilaku',
    C: 'Kemandirian',
    D: 'Komunikasi',
    E: 'Interaksi Sosial',
    F: 'Akademik',
};

export default function StudentRadarChart({ metrics }) {
    const data = metrics.map((metric) => ({
        subject: shortLabels[metric.id] ?? metric.label,
        value: metric.percent,
        fullMark: 100,
    }));

    return (
        <div className="h-[372px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={data} cx="50%" cy="52%" outerRadius="62%">
                    <PolarGrid stroke="#D1D4D7" />
                    <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: '#464646', fontSize: 11, fontWeight: 500 }}
                    />
                    <PolarRadiusAxis
                        angle={90}
                        domain={[0, 100]}
                        tick={false}
                        axisLine={false}
                    />
                    <Radar
                        name="Capaian"
                        dataKey="value"
                        stroke="#0081F2"
                        fill="#0081F2"
                        fillOpacity={0.18}
                        strokeWidth={3}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
