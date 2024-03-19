import { DRAWER, EPanelStatus } from '@constants/constants';
import { Button, Space } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { SidePanelForm } from '../sidePanelForm';
import { AppDispatch, RootState, useAppDispatch } from '@redux/configure-store';
import { addForm } from '@redux/reducers/appReducer';
import { useSelector } from 'react-redux';
import { generateUniqueKey } from '@utils/index';
import { useMemo } from 'react';

export const SidePanelContent = () => {
    const dispatch: AppDispatch = useAppDispatch();

    const formsData = useSelector((state: RootState) => state.app.formsData);
    const panelStatus = useSelector((state: RootState) => state.app.panelStatus);

    const handleAddExercise = () => {
        dispatch(addForm());
    };

    const removeButton = useMemo(() => {
        switch (panelStatus) {
            case EPanelStatus.EDIT:
                return (
                    <Button
                        style={{
                            width: '100%',
                            textAlign: 'left',
                            backgroundColor: 'var(--background-color-label)',
                            borderRadius: '0 0 6px 6px',
                        }}
                        type='link'
                        icon={<MinusOutlined />}
                    >
                        {DRAWER.button.remove}
                    </Button>
                );
            default:
                return (
                    <div />
                );
        }
    }, [panelStatus]);

    return (
        <>
            {formsData?.map((formData) => {
                return <SidePanelForm key={generateUniqueKey()} formData={formData} />;
            })}
            <Space
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    backgroundColor: 'var(--background-color-label)',
                    borderRadius: '0 0 6px 6px',
                    paddingLeft: '20px',
                    paddingRight: '20px'
                }}
            >
                <Button type='link' icon={<PlusOutlined />} onClick={handleAddExercise}>
                    {DRAWER.button.add}
                </Button>
                {removeButton}
            </Space>
        </>
    );
};
