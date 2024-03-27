import { ResponsivePie } from '@nivo/pie';
import { useTheme, useMediaQuery } from '@mui/material';
import { tokens } from '../theme';

const PieChart = ({ data }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 

    const calculateTotal = () => {
        return data.reduce((total, coin) => total + parseFloat(coin.valor), 0);
    };


    const totalValue = calculateTotal();

    return (
        <ResponsivePie
            data={data.map(coin => ({
                id: coin.criptomoeda,
                label: coin.criptomoeda,
                value: parseFloat(coin.valor),
            }))}
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
            margin={{ top: 40, right: isMobile ? 0 : 80, bottom: isMobile ? 80 : 80, left: isMobile ? 0 : 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor={colors.grey[100]}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabel={d => `${Math.round((d.value / totalValue) * 10000) / 100}%`} 
            isInteractive={false}
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
                }
            ]}
        />
    )
}

export default PieChart;
