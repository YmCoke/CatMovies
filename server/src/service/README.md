# 问题描述

在进行MovieService.modify方法开发的过程中, 出现: 当仅仅要修改movie实例的某个属性时, 如果其他属性有默认值, 会因为class-transformer库进行转换后拥有了初始的默认值(如movie的isHot, isComming). 若本来数据库中isHot的值是true. 在对某个属性进行修改时, 可能会对isHot的值进行误操作

# 解决方案

1. 不要默认值

将Movie类中所有的默认值都去除, 这样就不会有class-transformer转换时进行类型推导赋予默认值的情况.

2. 在进行数据库操作```updateOne```时, 不要传入经过转换后的movie. 只需要将平面对象传入即可. 因为此时的平面对象已经通过检验了, 是一个合格的movie数据.