import React from "react";

export interface Props {
  className?: string;
  style?: React.CSSProperties;
}

export interface State {
  i: number;
}

export default class Test extends React.PureComponent<Props, State> {
  public state: State = {
    i: 1,
  };

  public render() {
    const { className, style } = this.props;
    return (
      <div className={className} style={style} onClick={this.increase}>
        {this.state.i}=
      </div>
    );
  }

  private increase = () => {
    this.setState({ i: this.state.i + 1 });
  };
}
