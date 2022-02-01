import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import { Text, View, FlatList } from 'react-native'
import { colors } from '../colors'
import { Category } from './Category'

export const CategoryGroup = ({ categoryGroup }) => {
    const { color, name, elements } = categoryGroup
    const renderItem = useCallback(
        ({ item, index }) => {
            /* Add a separator only if it is not the last element */
            return <Category category={item} showSeparator={index + 1 !== elements.length} />
        },
        [elements],
    )
    return (
        <View>
            {categoryGroup.name ? (
                <View>
                    <View
                        style={{
                            backgroundColor: color ? colors[color + 'Light'] : colors.defaultLight,
                            padding: 8,
                        }}
                    >
                        <Text style={{ color: color ? colors[color] : colors.default }}>
                            {name}
                        </Text>
                    </View>
                    <FlatList
                        data={elements}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                    />
                </View>
            ) : (
                <></>
            )}
        </View>
    )
}

CategoryGroup.propTypes = {
    categoryGroup: PropTypes.shape({
        color: PropTypes.string,
        name: PropTypes.string,
        elements: PropTypes.array,
    }),
}
