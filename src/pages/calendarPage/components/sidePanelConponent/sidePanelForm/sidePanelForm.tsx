import { FC, useCallback } from 'react';

import cn from 'classnames';
import styles from './sidePanelForm.module.scss';

import { DRAWER } from '@constants/constants';
import { Form, Input, InputNumber, Space } from 'antd';
import { TSidePanelFormsData } from '../../../../../types';
import { AppDispatch, RootState, useAppDispatch } from '@redux/configure-store';
import { useSelector } from 'react-redux';
import { addCheckedExercise, removeCheckedExercise, setFormsData } from '@redux/reducers/appReducer';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

export const SidePanelForm: FC<{
    formData: TSidePanelFormsData;
    id: string;
}> = ({ formData, id }) => {
    const { _id, name, time, quantity, weight } = formData;

    const formsData = useSelector((state: RootState) => state.app.formsData);
    const panelStatus = useSelector((state: RootState) => state.app.panelStatus);
    const checkedExercises = useSelector((state: RootState) => state.app.checkedExercises);
    const dispatch: AppDispatch = useAppDispatch();

    const onChange = useCallback(
        (e: CheckboxChangeEvent) => {
            if (e.target.checked) {
                dispatch(addCheckedExercise(_id));
            } else {
                const newCheckedExercises = checkedExercises.filter((element) => element !== _id);
                dispatch(removeCheckedExercise(newCheckedExercises));
            }
            console.log(checkedExercises);
        },
        [_id, checkedExercises, dispatch],
    );

    const changeFormsData = useCallback(
        (id: string, values: TSidePanelFormsData) => {
            const newArr = formsData.map((formData) => {
                if (formData.id === id) {
                    return { ...values, id: formData.id };
                } else {
                    return formData;
                }
            });
            dispatch(setFormsData(newArr));
        },
        [dispatch, formsData],
    );

    return (
        <Form
            className={styles[cn('form')]}
            layout='vertical'
            initialValues={{
                name,
                quantity,
                weight,
                time,
            }}
            onValuesChange={(_, values) => {
                changeFormsData(id, values);
            }}
        >
            <Form.Item  name='name' style={{ marginBottom: '8px' }}>
                <Input autoFocus placeholder={DRAWER.inputNamePlaceholder} />
            </Form.Item>
            <Space size={16}>
                <Form.Item
                    style={{ marginBottom: '24px' }}
                    name='time'
                    label={DRAWER.numberInputs.time.label}
                >
                    <InputNumber
                        placeholder={DRAWER.numberInputs.time.placeholder}
                        addonBefore='+'
                        min={1}
                    />
                </Form.Item>
                <Space size={2}>
                    <Form.Item
                        style={{ marginBottom: '24px' }}
                        name='weight'
                        label={DRAWER.numberInputs.weight.label}
                    >
                        <InputNumber
                            placeholder={DRAWER.numberInputs.weight.placeholder}
                            min={0}
                        />
                    </Form.Item>
                    <span className={styles[cn('icon')]}>Х</span>

                    <Form.Item
                        style={{ marginBottom: '24px' }}
                        name='quantity'
                        label={DRAWER.numberInputs.quantity.label}
                    >
                        <InputNumber
                            placeholder={DRAWER.numberInputs.quantity.placeholder}
                            min={1}
                        />
                    </Form.Item>
                </Space>
            </Space>
        </Form>
    );
};
