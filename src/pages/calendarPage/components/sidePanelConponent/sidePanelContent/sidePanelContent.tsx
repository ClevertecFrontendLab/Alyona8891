import { DRAWER } from '@constants/constants';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { SidePanelForm } from '../sidePanelForm';
import { AppDispatch, RootState, useAppDispatch } from '@redux/configure-store';
import { addForm } from '@redux/reducers/appReducer';
import { useSelector } from 'react-redux';
import { generateUniqueKey } from '@utils/index';

export const SidePanelContent = () => {
    const dispatch: AppDispatch = useAppDispatch();

    const formsData = useSelector((state: RootState) => state.app.formsData);

    const handleAddExercise = () => {
        dispatch(addForm())
    };

    return (
        <>
            {formsData?.map((formData) => {
                return (
                    <SidePanelForm
                        key={generateUniqueKey()}
                        id={formData.id as string}
                        formData={formData}
                    />
                );
            })}
            <Button
                style={{
                    width: '100%',
                    textAlign: 'left',
                    backgroundColor: 'var(--background-color-label)',
                    borderRadius: '0 0 6px 6px',
                }}
                type='link'
                icon={<PlusOutlined />}
                onClick={handleAddExercise}
            >
                {DRAWER.createExercise.button}
            </Button>
        </>
    );
};
