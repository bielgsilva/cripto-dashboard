import { ResponsivePie } from '@nivo/pie';
import { useTheme, useMediaQuery } from '@mui/material';
import { tokens } from '../theme';

const PieChart = ({ data }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Verifica se é dispositivo móvel

    const getRandomColor = () => {
        const hue = Math.floor(Math.random() * 360); // Cor aleatória entre 0 e 360
        const saturation = Math.floor(Math.random() * 40) + 50; // Saturação entre 50% e 90%
        const lightness = Math.floor(Math.random() * 40) + 30; // Luminosidade entre 30% e 70%
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    };

    const pieData = data.map(coin => ({
        id: coin.criptomoeda,
        label: coin.criptomoeda,
        value: coin.valor,
        color: getRandomColor()
    }));

    return (
        <ResponsivePie
            data={pieData}
            theme={{
                axis: {
                    domain: {
                        line: {
                            stroke: colors.grey[100]
                        }
                    },
                    legend: {
                        text: {
                            fill: colors.grey[100]
                        }
                    },
                    ticks: {
                        line: {
                            stroke: colors.grey[100],
                            strokeWidth: 1
                        },
                        text: {
                            fill: colors.grey[100]
                        }
                    }
                },
                legends: {
                    text: {
                        fill: colors.grey[100]
                    }
                },
                tooltip: {
                    container: {
                        background: colors.primary[400],
                        color: colors.grey[100],
                    },
                }
            }}

            margin={{ top: 40, right: isMobile ? 0 : 80, bottom: isMobile ? 80 : 80, left: isMobile ? 0 : 80 }} // Ajuste das margens para dispositivos móveis
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        0.2
                    ]
                ]
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor={colors.grey[100]}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        2
                    ]
                ]
            }}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}

            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: colors.grey[100],
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: colors.greenAccent[400],
                            }
                        }
                    ]
                }
            ]}
        />
    )

}

export default PieChart;
