import React from "react";
import { Upload, Modal } from "antd";
import { UploadFile, RcCustomRequestOptions } from "antd/lib/upload/interface";
import { PlusOutlined } from "@ant-design/icons";

// 因为fileList受控时, onChange函数仅触发一次, 所以要自行封装customRequest函数

interface IProps {
    value?: string,
    onChange?: (url: string) => void
}

interface IState {
    showModel: boolean
}

export class ImgUploader extends React.Component<IProps, IState> {

    state: IState = {
        showModel: false
    }

    /**
     * 用于获取fileList
     */
    private getFileList = (): UploadFile[] | undefined => {
        if (!this.props.value) return undefined;
        return [{
            uid: this.props.value,
            name: this.props.value,
            url: this.props.value
        }]
    }

    /**
     * 将图片上传到对应action时触发的函数
     */
    private handleRequest = async (options: RcCustomRequestOptions) => {
        const formData = new FormData();
        formData.append(options.filename, options.file);
        // fetch api
        const request = new Request(options.action, {
            body: formData,
            method: "post"
        })
        const resp = await fetch(request).then(resp => resp.json());
        if (this.props.onChange){
            this.props.onChange(resp.data);
        }
    }

    private showModal = () => {
        this.setState({
            showModel: true
        })
    }

    private HideModal = () => {
        this.setState({
            showModel: false
        })
    }

    render() {
        const uploadButton = (<div>
            <PlusOutlined />
            <div className="ant-upload-text">图片上传</div>
        </div>);
        return (
            <div>
                <Upload
                    action="/api/upload"
                    name="imgfile"
                    listType="picture-card"
                    fileList={this.getFileList()}
                    customRequest={this.handleRequest}
                    onPreview={this.showModal}
                    onRemove={() => {
                        if (this.props.onChange){
                            this.props.onChange("");
                        }
                    }}
                >
                    {this.props.value ? null : uploadButton}
                </Upload >
                <Modal visible={this.state.showModel} footer={null} onCancel={this.HideModal}>
                    <img alt="example" style={{width: '100%'}}  src={this.props.value}  />
                </Modal>
            </div>
        )
    }
}