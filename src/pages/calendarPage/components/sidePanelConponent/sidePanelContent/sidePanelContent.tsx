import { DRAWER, EPanelStatus } from '@constants/constants';
import { Button, Space } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { SidePanelForm } from '../sidePanelForm';
import { AppDispatch, RootState, useAppDispatch } from '@redux/configure-store';
import { addForm, setFormsData } from '@redux/reducers/appReducer';
import { useSelector } from 'react-redux';
import { generateUniqueKey, removeElementsFromArray } from '@utils/index';
import { useCallback, useMemo } from 'react';

export const SidePanelContent = () => {
    const dispatch: AppDispatch = useAppDispatch();

    const formsData = useSelector((state: RootState) => state.app.formsData);
    const panelStatus = useSelector((state: RootState) => state.app.panelStatus);
    const checkedExercises = useSelector((state: RootState) => state.app.checkedExercises);

    const handleAddExercise = () => {
        dispatch(addForm());
    };

    const handleRemoveExercise = useCallback(() => {
        const newFormsData = removeElementsFromArray(formsData, checkedExercises);
        dispatch(setFormsData(newFormsData));
    }, [checkedExercises, dispatch, formsData]);

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
                        onClick={handleRemoveExercise}
                        disabled={checkedExercises.length > 0 ? false : true}
                        icon={<MinusOutlined />}
                    >
                        {DRAWER.button.remove}
                    </Button>
                );
            default:
                return <div />;
        }
    }, [checkedExercises.length, handleRemoveExercise, panelStatus]);

    return (
        <>
            {formsData?.map((formData, i) => {
                return <SidePanelForm i={i} key={generateUniqueKey()} formData={formData} />;
            })}
            <Space
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    backgroundColor: 'var(--background-color-label)',
                    borderRadius: '0 0 6px 6px',
                    paddingLeft: '20px',
                    paddingRight: '20px',
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
