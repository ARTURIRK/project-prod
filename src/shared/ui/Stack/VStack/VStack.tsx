import { Flex, FlexProps } from '../Flex/Flex';

type Props = Omit<FlexProps, 'direction'>

export const VStack = (props: Props) => {
    const { align = 'start' } = props;
    return (

        <Flex {...props} direction="column" align={align} />
    );
};
