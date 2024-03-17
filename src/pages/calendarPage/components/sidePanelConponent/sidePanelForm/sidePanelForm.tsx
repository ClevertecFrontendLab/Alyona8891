import { FC, useCallback } from 'react';

import cn from 'classnames';
import styles from './sidePanelForm.module.scss';

import { DRAWER } from '@constants/constants';
import { Form, Input, InputNumber, Space } from 'antd';
import { TSidePanelFormsData } from '../../../../../types';
import { AppDispatch, RootState, useAppDispatch } from '@redux/configure-store';
import { useSelector } from 'react-redux';
import { setFormsData } from '@redux/reducers/appReducer';

export const SidePanelForm: FC<{
    formData: TSidePanelFormsData;
    id: string;
}> = ({ formData, id }) => {
    const { name, time, quantity, weight } = formData;

    const formsData = useSelector((state: RootState) => state.app.formsData);
    const dispatch: AppDispatch = useAppDispatch();

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
                console.log(values);
                changeFormsData(id, values);
            }}
        >
            <Form.Item name='name' style={{ marginBottom: '8px' }}>
                <Input placeholder={DRAWER.createExercise.inputNamePlaceholder} />
            </Form.Item>
            <Space size={16}>
                <Form.Item
                    style={{ marginBottom: '24px' }}
                    name='quantity'
                    label={DRAWER.createExercise.numberInputs.quantity.label}
                >
                    <InputNumber
                        placeholder={DRAWER.createExercise.numberInputs.quantity.placeholder.toString()}
                        addonBefore='+'
                    />
                </Form.Item>
                <Space size={2}>
                    <Form.Item
                        style={{ marginBottom: '24px' }}
                        name='weight'
                        label={DRAWER.createExercise.numberInputs.weight.label}
                    >
                        <InputNumber
                            placeholder={DRAWER.createExercise.numberInputs.weight.placeholder.toString()}
                        />
                    </Form.Item>
                    <span className={styles[cn('icon')]}>Х</span>

                    <Form.Item
                        style={{ marginBottom: '24px' }}
                        name='time'
                        label={DRAWER.createExercise.numberInputs.time.label}
                    >
                        <InputNumber
                            placeholder={DRAWER.createExercise.numberInputs.time.placeholder.toString()}
                        />
                    </Form.Item>
                </Space>
            </Space>
        </Form>
    );
};
